from flask import render_template,request,redirect,session
import bcrypt

class AuthRoutes:
  def __init__(self,app,database):
    admins=database["Admins"]

    # Admin Register
    # @app.route('/register', methods=['GET','POST'])
    # def adminRegister():
    #   if request.method=='GET':
    #     return render_template("AdminRegisterLogin.html",type="register")
    #   else:
    #     username=request.form['username']
    #     password=request.form['password']

    #     password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    #     admins.insert_one({"username":username,"password":password.decode('utf-8')})

    #     session['admin']=username

    #     return redirect('/admin-portal')
      
    # Admin Login  
    @app.route('/login',methods=['GET','POST'])
    def adminLogin():
      if request.method=='GET':
        return render_template("AdminRegisterLogin.html",type="login")
      else:
        username=request.form['username']
        password=request.form['password']

        user=admins.find_one({"username":username})

        if(user and bcrypt.checkpw(password.encode('utf-8'),user.get("password").encode('utf-8'),)):
          
          session['admin']=username
          return redirect('/admin-portal')
        else:
          return redirect('/login')
    
    @app.route('/admin-portal',methods=['GET'])
    def adminPortal():
      if 'admin' not in session:
        return redirect('/login')
      else:
        return render_template("AdminPortal.html")
        



