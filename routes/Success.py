from flask import render_template 

class SuccessRoutes:
  def __init__(self,app):

    @app.route('/adminSuccess',methods=['GET'])
    def adminSuccess():
      return render_template("AdminSuccess.html")
    
    @app.route('/userSuccess',methods=['GET'])
    def userSuccess():
      return render_template("UserSuccess.html")