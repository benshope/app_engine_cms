#!/usr/bin/env python

import webapp2
from boilerplate import BaseHandler

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import users

class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html",{"title": "My Angular App"})

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/view2', MainHandler),
    ('/view3', MainHandler)
], debug=True)
