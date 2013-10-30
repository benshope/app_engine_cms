import webapp2
import os
import json
import cgi
import urllib
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail

class JSON_Handler(webapp2.RequestHandler):
    def get(self, page):
        # Return the data for a url formatted as JSON

        # page_key = ndb.Key('site', url)
        # page_data = asdfasdf.query_databse(page_key)
        # json.dumps([page.to_dict() for page in Page.query(Page.name == url).fetch()])
        self.response.out.write('JSON Get')

    def post(self, page):
        # Post a the data for a url to the database

        # page = Page(parent=ndb.Key('site', url), content = self.request.get('content'))
        # page.put()
        self.response.write('JSON Post')

class User_Handler(webapp2.RequestHandler):
    def get(self, url):
        self.response.out.write('User Get')
    def post(self, url):
        self.response.out.write('User Post')

class Mail_Handler(webapp2.RequestHandler):
  def post(self):
        body = json.loads(self.request.body)

        origin = destination = 'Ben Shope <nimajnebs@gmail.com>'

        email = body.get('email')
        name = body.get('name')
        message = body.get('message')
        mail.send_mail(origin, destination, name, message)


app = webapp2.WSGIApplication([
    ('/json/(.*)', JSON_Handler), 
    ('/user', User_Handler), 
    ('/mail', Mail_Handler)], debug=True)