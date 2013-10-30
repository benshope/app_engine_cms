import webapp2
import os
import json
import cgi
import urllib
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail

class Mail_Handler(webapp2.RequestHandler):
  def post(self):
        body = json.loads(self.request.body)

        sender = to = 'nimajnebs@gmail.com'
        subject = 'Contact Form Message'

        message = '{0} {1} {2}'.format(
          body.get('name'),
          body.get('email'),
          body.get('message'))

        mail.send_mail(sender, to, subject, message)

app = webapp2.WSGIApplication([('/mail', Mail_Handler)], debug=True)