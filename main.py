import webapp2
import os
import json
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)), autoescape=True)

class Page(ndb.Model):
	content = ndb.StringProperty()
  	date = ndb.DateTimeProperty(auto_now_add=True)

class HTML_Handler(webapp2.RequestHandler):
    def get(self, url):
    	template = jinja_environment.get_template("index.html")
    	self.response.out.write(template.render()) # maybe render the template with the url?

class JSON_Handler(webapp2.RequestHandler):
    def render_string(self, template, params):
        template = jinja_environment.get_template(template)
        return template.render(params)
    def render(self, template, kw):
        self.response.out.write(self.render_string(template, kw))

    def post(self, url):
        # Look at the post data
        # Make sure an entity corresonds with the post data
        # If an entity doesn't correspond with the post data, create it
        # Otherwise update the entity with the new post data
        page = Page(parent=ndb.Key('site', url), content = self.request.get('content'))
        page.put()
        self.response.write('HTML Post')

    def get(self, url):
    	page_key = ndb.Key('site', url)
        # page_data = asdfasdf.query_databse(page_key)
        # Return all this crap formatted as JSON
        self.response.out.write('JSON Get')

app = webapp2.WSGIApplication([('/json/(.*)', JSON_Handler),('/(.*)', HTML_Handler)], debug=True)