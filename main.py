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
        data = [self.request.get(x) for x in ['name', 'email', 'message']]
        mail.send_mail(sender=data[1], 
            to='nimajnebs@gmail.com', 
            subject='Contact Form Message', 
            body='From: {} | {} \nMessage: {}'.format(*data))
        self.response.out.write('Thanks!  Your message has been sent.')

app = webapp2.WSGIApplication([
  ('/login', Login),
  ('/contact', Contact),
  ('/database', Database)
])