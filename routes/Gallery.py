from flask import request, render_template,jsonify,redirect
from bson import ObjectId

class GalleryRoutes:
  def __init__(self,app, database, s3):
    galleries=database["Galleries"]

    # Upload Images To AWS
    def uploadImageToAWS(fileObj):

        fileName = f"Gallery/{fileObj.filename}"
        bucketName = 'floater-adventure'
        s3.upload_fileobj(fileObj, bucketName, fileName)

        return f"https://{bucketName}.s3.amazonaws.com/{fileName}"
    
    # Add Gallery Route
    @app.route('/add-gallery',methods=['POST','GET'])
    def addGallery():
      if request.method == "GET":
        return render_template("AddGallery.html")
      else:
        gallery={}
        gallery['title']=request.form.get("title")

        mediaFiles=[]
        i=0
        while(f"media_file_{i}" in request.files):

          mediaUrl=uploadImageToAWS(request.files.get(f"media_file_{i}"))
          mediaFiles.append(mediaUrl)
          i+=1
        
        gallery['mediaFiles']=mediaFiles
        galleries.insert_one(gallery)

        return redirect('/adminSuccess')
      
    # Delete Gallery
    @app.route('/delete-gallery', methods=['POST','GET'])
    def deleteGallery():
      if request.method=="GET":
        return render_template("DeleteGallery.html")
      
      else:
        gallery_id=request.form['gallery_id']

        try:
          result = galleries.delete_one({"_id": ObjectId(gallery_id)})
          if result.deleted_count > 0:
              return redirect('/adminSuccess')
          else:
              return redirect('/delete-gallery')
        except:
          return redirect('/delete-gallery')
        
    # Display Galleries
    @app.route('/galleries', methods=['GET','POST'])
    def displayGalleries():
      if request.method == "GET":
        return render_template("Galleries.html")
      else:
        result=list(galleries.find())

        for each in result:
          each['_id']=str(each['_id'])

        return jsonify(result)
    
    # Display Gallery
    @app.route('/gallery',methods=['POST','GET'])
    def displayGallery():
      if request.method=="GET":
        title=request.args.get("title")
        return render_template("Gallery.html",title=title)
      else:
        title=request.args.get("title")
        result=galleries.find_one({"title":title})

        result["_id"]=str(result["_id"])

        return jsonify(result)




  
