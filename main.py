
import webapp2
import os
import json
import jinja2

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import users

template_dir = os.path.dirname(__file__)
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(template_dir), autoescape=True, variable_start_string='{{{', variable_end_string='}}}')

class MainHandler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a,**kw)

    def render_str(self, template, params):
        t = jinja_environment.get_template(template)

        if self.adminCheck():
            params['admin'] = True;

        return t.render(params)

    def render(self, template, kw):
        self.write(self.render_str(template, kw))

    def adminCheck(self):
        user = users.get_current_user()
        if user:
            if users.is_current_user_admin():
                return True;
            else:
                return False
        else:
            return False

    def get(self):
        self.render("index.html",{"title": "My Angular App"})


app = webapp2.WSGIApplication([
    # We let angular handle routing on the client side
    ('/', MainHandler),
    ('/view2', MainHandler),
    ('/view3', MainHandler)
], debug=True)
