import webapp2
import cgi
import urllib
import json
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail


class Storage(ndb.Model):
    # content  = ndb.JsonProperty()
    content  = ndb.StringProperty()

class Access(webapp2.RequestHandler):
    def get(self):
        # entity = ndb.Key(Storage, 'all').get()
        # self.response.headers['Content-Type'] = 'application/json'
        # self.response.out.write(json.dumps(entity))
        entity = ndb.Key(Storage, 'all').get()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(entity))
    def post(self):
        content = json.loads(self.request.body).get('content')
        entity = ndb.Key(Storage, 'all').get()
        if not entity:
            entity = Storage(content='')
        entity.content = content
        entity.put()

class Login(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            self.response.write('You are logged in: ' + user.nickname())
        else:
            self.redirect(users.create_login_url(self.request.uri))

class Contact(webapp2.RequestHandler):
    def post(self):
        json_data = json.loads(self.request.body)
        data = [json_data.get(x) for x in ['name', 'email', 'message']]
        mail.send_mail(sender='nimajnebs@gmail.com', 
            to='nimajnebs@gmail.com', 
            subject='Contact Form Message', 
            body='From: {} \nEmail: {} \nMessage: {}'.format(*data))
        self.response.out.write('Thanks!  Your message has been sent.')

app = webapp2.WSGIApplication([
  ('/login', Login),
  ('/contact', Contact),
  ('/access', Access)
])