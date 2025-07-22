from flask import render_template,redirect
import os 
from pymongo import MongoClient
class WelcomeRoutes:
  def __init__(self,app):

    #Welcome Route
    @app.route('/',methods=['GET'])
    def renderHome():
      return redirect("/home")
    

    
