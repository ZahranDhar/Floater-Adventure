from flask import render_template,redirect

class WelcomeRoutes:
  def __init__(self,app):

    #Welcome Route
    @app.route('/',methods=['GET'])
    def renderHome():
      return redirect("/home")