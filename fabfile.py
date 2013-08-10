from fabric.api import local

# Start the local app server
def run(mode="normal"):
    local("dev_appserver.py .")

# Save to GitHub
def save(m="Auto-Update"):
    local("git add .")
    local("git commit -a -m '{0}'".format(m))
    local("git push")

# Upload to App Engine
def deploy():
    """ upload the app """
    local("appcfg.py --oauth2 update .")

# Upload to App Engine and save to GitHub
def update(m="Auto-Update"):
    local("git add .")
    local("git commit -a -m '{0}'".format(m))
    local("git push")
    local("appcfg.py --oauth2 update .")