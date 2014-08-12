import webapp2
import json
from google.appengine.api import mail

class SendMail(webapp2.RequestHandler):
    def post(self):
        json_data = json.loads(self.request.body)
        data = [json_data.get(x) for x in ['name', 'email', 'message']]
        mail.send_mail(sender='nimajnebs@gmail.com',
            to='nimajnebs@gmail.com',
            subject='Window Pods',
            body='{}\n{}\n{}'.format(*data))
        self.response.out.write('Thanks!  Your message has been sent.')

app = webapp2.WSGIApplication([
  ('/mail', SendMail)
])
