from flask import request, render_template, jsonify,redirect
from bson import ObjectId

class PackageRoutes:
  def __init__(self,app,database,s3):
    packages=database["Packages"]

    # Delete Package Route
    @app.route('/delete-package',methods=['POST','GET'])
    def deletePackage():

      # Delete Package
      if request.method=="GET":
        return render_template("DeleteListing.html")
      
      else:
        package_id=request.form['package_id']

        try:
          result = packages.delete_one({"_id": ObjectId(package_id)})
          if result.deleted_count > 0:
              return redirect('/adminSuccess')
          else:
              return redirect('/delete-package')
        except:
          return redirect('/delete-package')

          
      
    # Upload Images To AWS
    def uploadImageToAWS(fileObj):

        fileName = f"profile_pictures/{fileObj.filename}"
        bucketName = 'learnarc-storageaws'
        s3.upload_fileobj(fileObj, bucketName, fileName)

        return f"https://{bucketName}.s3.amazonaws.com/{fileName}"
    
    
    # Add Package Route
    @app.route('/add-package',methods=['GET','POST'])
    def addPackage():
      if request.method=="GET":
        return render_template("AddPackage.html")
      else:
        package={}
        package['title']=request.form['title']
        package['category']=request.form['category']
        package['overview']=request.form['overview']
        package['description']=request.form['description']
        package['displayOnHome']=bool(request.form.get("display_on_home"))
        package['galleryID']=request.form['galleryID']

        thumbnail=request.files['thumbnail']
        if thumbnail:
          thumbnailurl=uploadImageToAWS(thumbnail)
          package['thumbnailURL']=thumbnailurl

        itineraries=[]
        i=0
        while(f"itinerary_title_{i}" in request.form):
          itinerary={}
          itinerary['title']=request.form[f"itinerary_title_{i}"]
          itinerary['content']=request.form[f"itinerary_content_{i}"]
          itinerary['accommodation']=request.form[f"itinerary_accommodation_{i}"]
          itinerary['meals']=request.form[f"itinerary_meals_{i}"]

          itinerarythumbnail=request.files[f"itinerary_image_{i}"]
          if itinerarythumbnail:
            itinerarythumbnailurl=uploadImageToAWS(itinerarythumbnail)
            itinerary['itinerarythumbnailURL']=itinerarythumbnailurl

            itineraries.append(itinerary)
            i+=1
        
        package['itineraries']=itineraries

        package['inclusions']=request.form.getlist('inclusion[]')
        package['exclusions']=request.form.getlist('exclusion[]')

        package['reviews']=[]
        package['average_rating']=0
        package['price']=request.form['price']

        return redirect('/adminSuccess')
      
    # Get Package Page Route
    @app.route('/get-package',methods=['GET','POST'])
    def displayPackage():

      if request.method=="GET":
        return render_template("Package.html",package_id=request.args['package_id'])
      
      else:
        package_id=request.args['package_id']

        package=packages.find_one({"_id":ObjectId(package_id)})
        package['_id']=str(package_id)

        return jsonify(package)
      
    # Review route
    @app.route('/add-review',methods=['POST'])
    def addReview():
      review=request.get_json()
      package_id=ObjectId(request.args.get('package_id'))
      packages.update_one({"_id":package_id},{"$push":{"reviews":review}})

      result=packages.find_one({"_id":package_id})
      reviews=result.get("reviews",[])
      if(len(reviews)>0):
        totalRating=0
        for review in reviews:
          totalRating=totalRating+int(review.get("rating"))
        averageRating=totalRating/len(reviews)
        packages.update_one({"_id":package_id},{"$set":{"average_rating":averageRating}})

      return jsonify({"success": True,"average_rating":averageRating})
    
    # Get Home Packages Route
    @app.route('/getHomePackages', methods=['POST'])
    def getHomePackages():

      result=list(packages.find({"displayOnHome":True}))

      for package in result:
        package['_id']=str(package.get("_id"))

      return jsonify(result)
    
    # Get Category Packages Route
    @app.route('/getCategoryPackages', methods=['GET','POST'])
    def getCategoriesPackages():

      if request.method == "GET":
        category=request.args.get("category")
        return render_template("Packages.html",category=category)
      
      else:
        
        category=request.args.get("category")
        result=list(packages.find({"category":category}))

        for package in result:
          package['_id']=str(package.get("_id"))

        return jsonify(result)

    # Get Packages Titles Route
    @app.route('/get-package-titles',methods=["POST"])
    def displayPackageTitles():
      result=list(packages.find())
      titles=[]
      for package in result:
        titles.append(package.get("title"))

      return jsonify(titles)

    

        









        
        




