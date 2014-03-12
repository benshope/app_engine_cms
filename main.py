import webapp2
import os
import json
import cgi
import urllib
from google.appengine.api import mail

class Login(webapp2.RequestHandler):
    self.redirect(users.create_login_url(self.request.uri))

class Database(webapp2.RequestHandler):
    pass

class Contact(webapp2.RequestHandler):
    def post(self):
        mail.send_mail(sender="Ben Shope <nimajnebs@gmail.com>", to="Ben Shope <nimajnebs@gmail.com>", subject="BenShope Contact Form Message", body="From: {0} | {1} \nMessage: {2}".format(self.request.get('name'), self.request.get('email'), self.request.get('message')))
        self.response.out.write('Thanks!  Your message has been sent.')

app = webapp2.WSGIApplication([
  ('/login', Login), 
  ('/mail', Contact), 
  ('/database', Database)
])