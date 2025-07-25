from flask import render_template, request,jsonify,redirect
from bson import ObjectId

class ExpeditionsRoutes:
  def __init__(self,app,database,s3):
    expeditions=database["Expeditions"]

    # Upload Images To AWS
    def uploadImageToAWS(fileObj):

        fileName = f"Expeditions/{fileObj.filename}"
        bucketName = 'floater-adventure'
        s3.upload_fileobj(fileObj, bucketName, fileName)

        return f"https://{bucketName}.s3.amazonaws.com/{fileName}"
    
    # Add Expeditions Route
    @app.route('/add-expedition',methods=['POST','GET'])
    def addExpeditions():

      if request.method == "GET":
        return render_template('AddExpedition.html')
      
      else:

        expedition={}
        expedition['title']=request.form.get("title")
        expedition['description']=request.form.get("description")
        expedition['displayOnHome']=bool(request.form.get("displayOnHome"))

        thumbnail=request.files["thumbnail"]

        if thumbnail:
          thumbnailUrl=uploadImageToAWS(thumbnail)
          expedition['thumbnailUrl']=thumbnailUrl

        expeditions.insert_one(expedition)

        return redirect('/adminSuccess')

    # Get Categories Route
    @app.route('/getCategories',methods=['POST'])
    def displayCategories():

      result=list(expeditions.find())
      categories=[]

      for expedition in result:
        categories.append(expedition.get("title"))

      return jsonify(categories)

    # Get Expeditions Route
    @app.route('/expeditions',methods=['GET','POST'])
    def displayExpeditions():
      if request.method=="GET":
        return render_template('Expeditions.html')
      else:
        result=list(expeditions.find())

        if result:
          for expedition in result:
            expedition["_id"]=str(expedition.get("_id"))

        return jsonify(result)

    # Get Home Expeditions
    @app.route('/home-expeditions', methods=['GET','POST'])
    def displayHomeExpeditions():
      result=list(expeditions.find({"displayOnHome":True}))
      if result:
          for expedition in result:
            expedition["_id"]=str(expedition.get("_id"))

      return jsonify(result)
    
    # Delete Expedition
    @app.route('/delete-expedition', methods=['POST','GET'])
    def deleteExpedition():
      if request.method=="GET":
        return render_template("DeleteExpedition.html")
      
      else:
        expedition_id=request.form['expedition_id']

        try:
          result = expeditions.delete_one({"_id": ObjectId(expedition_id)})
          if result.deleted_count > 0:
              return redirect('/adminSuccess')
          else:
              return redirect('/delete-expedition')
        except:
          return redirect('/delete-expedition')
        
    @app.route('/get-expedition-id',methods=['GET'])
    def getExpeditionID():
      
      expedition=request.args.get("category")
      result=expeditions.find_one({"title":expedition})
      expeditionID=str(result.get("_id"))

      return jsonify({"expedition_id":expeditionID})
