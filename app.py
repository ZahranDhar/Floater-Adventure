from flask import Flask, render_template,request,jsonify
from pymongo import MongoClient
import boto3
from routes.Quote import QuoteRoutes
from routes.Welcome import WelcomeRoutes
from routes.Auth import AuthRoutes
from routes.Package import PackageRoutes
from routes.Navigation import NavigationRoutes
from routes.Expeditions import ExpeditionsRoutes
from routes.Gallery import GalleryRoutes
from routes.Success import SuccessRoutes
import os

# Connecting to MongoDB
client=MongoClient(os.getenv('MongoClient'))
database=client["Floater-Adventure"]

# AWS Boto3 Object
s3 = boto3.client('s3',aws_access_key_id=os.getenv('AWS_ID'), aws_secret_access_key=os.getenv('AWS_KEY'), region_name='eu-north-1' )

# Flask object
app=Flask(__name__)
app.secret_key=os.getenv('App_Secret_Key')

# SMTP Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'zahrannazirdhar@gmail.com'     
app.config['MAIL_PASSWORD'] = os.getenv('Mail_Pass')        
app.config['MAIL_DEFAULT_SENDER'] = 'zahrannazirdhar@gmail.com'

# Configuring Routes
WelcomeRoutes(app,client)
QuoteRoutes(app,database,)
AuthRoutes(app,database)
PackageRoutes(app,database,s3)
ExpeditionsRoutes(app,database,s3)
NavigationRoutes(app)
GalleryRoutes(app,database,s3)
SuccessRoutes(app)


# Running Flask
# app.run(debug=True)