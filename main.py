import webapp2
import cgi
import os
import json
import jinja2
from google.appengine.api import memcache
from google.appengine.ext import ndb
from google.appengine.api import users

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)), autoescape=True)  #, variable_start_string='{{{', variable_end_string='}}}'


def datastore_key(entity_name='page'):
    return ndb.Key('Page', entity_name)

class HTML_Handler(webapp2.RequestHandler):
    def get(self, url):
    	template = jinja_environment.get_template("index.html")
    	self.response.out.write(template.render())

    def post(self, url):
        self.response.write('HTML Post')

class JSON_Handler(webapp2.RequestHandler):
    def render_string(self, template, params):
        template = jinja_environment.get_template(template)
        return template.render(params)

    def render(self, template, kw):
        self.response.out.write(self.render_string(template, kw))

    def post(self, url):
        self.response.write('JSON Post')

    def get(self, url):
        self.response.out.write('JSON Get')

app = webapp2.WSGIApplication([('/json/(.*)', JSON_Handler),('/(.*)', HTML_Handler)], debug=True)