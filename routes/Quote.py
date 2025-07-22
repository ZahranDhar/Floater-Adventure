from flask import request, render_template,flash,redirect
from flask_mail import Mail,Message

class QuoteRoutes:
  def __init__(self,app,db):

    quotes=db['Quotes']

    @app.route('/submit-quote',methods=['POST'])
    def userinfo():
      name=request.form['name']
      contact=request.form['contact']
      email=request.form['email']
      address=request.form['address']
      package=request.form['package']

      quote={
        "name":name,
        "contact":contact,
        "email":email,
        "address":address,
        "package":package
      }

      quotes.insert_one(quote)

      # Send Mails
      mail=Mail(app)
      
      userMessage=Message(
        subject='Floater Adventure Quote Request',
        sender=app.config['MAIL_USERNAME'],
        recipients=[email],
        body=f"""
        Hello {name}. We have received your request for quote of {package} package. We will contact you soon.

        Thank you for choosing Floater Adventure!

        Regards
        Floater Adventure"""
      )

      adminMessage=Message(
        subject="Floater Adventure Quote Request",
        sender=app.config['MAIL_USERNAME'],
        recipients=["zahrannazirdhar@gmail.com"],
        body=f"""
        You have received a quote request. The details of costumer are listed below:

        Name: {name}
        Contact: {contact}
        Email: {email}
        Address: {address}
        Package: {package}"""
      )

      try:
        mail.send(userMessage)
        mail.send(adminMessage)
      except Exception as e:
        flash(f"Failed to send email: {e}", "error")
      


      return redirect('/userSuccess')
  
    #
    @app.route('/userSuccess', methods=['GET'])
    def displayUserSuccess():
      return render_template("UserSuccess.html")
        
    