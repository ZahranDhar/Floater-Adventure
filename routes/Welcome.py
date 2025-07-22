from flask import render_template,redirect

class WelcomeRoutes:
  def __init__(self,app,client):

    #Welcome Route
    @app.route('/',methods=['GET'])
    def renderHome():
      return redirect("/home")
    
    @app.route('/testdb', methods=['GET'])
    def test_db():
      try:
          print("Databases:", client.list_database_names())
          return "Check Vercel logs for database list."
      except Exception as e:
          print("Error accessing MongoDB:", e)
          return "MongoDB error occurred", 500