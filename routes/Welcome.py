from flask import render_template,redirect

class WelcomeRoutes:
  def __init__(self,app,client):

    #Welcome Route
    @app.route('/',methods=['GET'])
    def renderHome():
      return redirect("/home")
    
    @app.route('/testdb', methods=['GET'])
    def testdb():

      print(client.list_database_names())