from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///projectsList.sqlite3'

db = SQLAlchemy(app)

# db.create_all()

class Issue(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	projectName = db.Column(db.String(50))
	title = db.Column(db.String(50))
	description = db.Column(db.Text)
	priority = db.Column(db.String(20))
	lastUpdated = db.Column(db.Date())
	added = db.Column(db.Date())



@app.route("/issue", methods=["POST"])
def create_issue():
	data = request.json
	new_issue = Issue(    
                          projectName=data['projectName'],
						  title = data['title'],
						  description = data['description'],
                          priority = data['priority'],
                          lastUpdated = datetime.now(),
                          added = datetime.now()
						  
						)
	db.session.add(new_issue)
	db.session.commit()
	return make_response(jsonify("New issue is created!"), 200)


@app.route('/issues', methods=['GET'])
def get_all_issues():
    issueList = Issue.query.all()
    output = []
    for issue in issueList:
        result = {}
        result["id"] = issue.id
        result["projectName"] = issue.projectName
        result["title"] = issue.title
        result["description"] = issue.description
        result["priority"] = issue.priority
        result["lastUpdated"] = issue.lastUpdated
        result["added"] = issue.added
        output.append(result)
    return jsonify(output)


@app.route("/issue/<id>", methods=["GET"])
def get_one_issue(id):
    issue = Issue.query.filter_by(id=id).first()
    if not issue:
        return make_response(jsonify("Issue id not found"), 404)
    result = {}
    result["id"] = issue.id
    result["projectName"] = issue.projectName
    result["title"] = issue.title
    result["description"] = issue.description
    result["priority"] = issue.priority
    result["lastUpdated"] = issue.lastUpdated
    result["added"] = issue.added
    return jsonify(result)


@app.route('/issue/<id>', methods=['PUT'])
def update_issue(id):
    data = request.json
    projectName = data.get('projectName', None)
    title = data.get('title', None)
    description = data.get('description', None)
    priority = data.get('priority', None)
    issue = Issue.query.filter_by(id=id).first()
    if not issue:
        return make_response(jsonify("Issue not found!"), 404)

    issue.projectName = projectName
    issue.title = title
    issue.description = description
    issue.priority = priority
    issue.lastUpdated = datetime.now()
    issue.added = datetime.now()
    db.session.commit()

    return make_response(jsonify("Updated!"), 200)


@app.route("/issue/<id>", methods=["DELETE"])
def delete_issue(id):
    issue = Issue.query.filter_by(id=id).first()
    if not issue:
        return make_response(jsonify("Issue id not found"), 404)

    db.session.delete(issue)
    db.session.commit()
    return make_response(jsonify("Deleted!"), 200)

