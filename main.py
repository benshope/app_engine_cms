
import webapp2
import os
import json
import jinja2

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import users

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)), autoescape=True)
#, variable_start_string='{{{', variable_end_string='}}}'

class HTML_Handler(webapp2.RequestHandler):
    def get(self):
    	template = jinja_environment.get_template("index.html")
    	self.response.out.write(template.render())

class JSON_Handler(webapp2.RequestHandler):
    def render_string(self, template, params):
        template = jinja_environment.get_template(template)
        return template.render(params)

    def render(self, template, kw):
        self.response.out.write(self.render_string(template, kw))

    def get(self):
        self.render("index.html",{"title": "My Angular App"})


app = webapp2.WSGIApplication([
    # We let angular handle routing on the client side
    (r'/json/(*)', JSON_Handler),
    (r'/(*)', HTML_Handler)
], debug=True)
