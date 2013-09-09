import webapp2
import os
import json
from google.appengine.ext import ndb
from google.appengine.api import users

class Page(ndb.Model):
	content = ndb.StringProperty()
  	date = ndb.DateTimeProperty(auto_now_add=True)

class JSON_Handler(webapp2.RequestHandler):
    def post(self, url):
        # Post a the data for a url to the database

        # page = Page(parent=ndb.Key('site', url), content = self.request.get('content'))
        # page.put()
        self.response.write('JSON Post')

    def get(self, url):
        # Return the data for a url formatted as JSON

    	# page_key = ndb.Key('site', url)
        # page_data = asdfasdf.query_databse(page_key)
        json.dumps([page.to_dict() for page in Page.query(Page.name == url).fetch()])
        self.response.out.write('JSON Get')

app = webapp2.WSGIApplication([('/json/(.*)', JSON_Handler)], debug=True)