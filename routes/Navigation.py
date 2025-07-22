from flask import render_template

class NavigationRoutes:
  def __init__(self,app):

    # Home Route
    @app.route('/home',methods=['GET'])
    def displayHome():
      return render_template('index.html')
    
    # Contact Us Route
    @app.route('/contactUs',methods=['GET'])
    def displayContactUs():
      return render_template('ContactUs.html')

    # About Us Route
    @app.route('/aboutUs',methods=['GET'])
    def displayAboutUs():
      return render_template('AboutUs.html')

    # Our Team Route
    @app.route('/ourTeam',methods=['GET'])
    def displayOurTeam():
      return render_template('OurTeam.html')
    
    # Our Team Route
    @app.route('/termsAndConditions',methods=['GET'])
    def displayTermsAndConditions():
      return render_template('TermsAndConditions.html')
    
    
