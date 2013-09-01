
import webapp2
import os
import json
import jinja2

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import users

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)), autoescape=True, variable_start_string='{{{', variable_end_string='}}}')

class RequestHandler(webapp2.RequestHandler):
    def render_string(self, template, params):
        template = jinja_environment.get_template(template)
        return template.render(params)

    def render(self, template, kw):
        self.response.out.write(self.render_string(template, kw))

    def get(self):
        self.render("index.html",{"title": "My Angular App"})


app = webapp2.WSGIApplication([
    # We let angular handle routing on the client side
    ('/', RequestHandler),
    ('/view2', RequestHandler),
    ('/view3', RequestHandler)
], debug=True)
