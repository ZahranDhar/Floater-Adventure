from flask import render_template,redirect
import os 
from pymongo import MongoClient
class WelcomeRoutes:
  def __init__(self,app,client):

    #Welcome Route
    @app.route('/',methods=['GET'])
    def renderHome():
      return redirect("/home")
    
    @app.route('/test-db')
    def test_db():
        try:
            mongo_url = os.getenv('MongoClient')
            print("MongoClient env:", mongo_url)
            client = MongoClient(mongo_url)
            print("Databases:", client.list_database_names())
            return "Success"
        except Exception as e:
            print("Error accessing MongoDB:", e)
            return "MongoDB error occurred", 500
