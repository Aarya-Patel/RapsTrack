# RapsTrack
A web application that allows Toronto Raptors' fans to keep up with their favourite team!

## Prerequisites 
Make sure to have the following, otherwise download them: 
- NodeJs: https://nodejs.org/en/
- Python3.7: https://www.python.org

## Cloning Instructions

1. Copy the git repository url and then clone the repo wherever you like.
```
git clone https://github.com/Aarya-Patel/RapsTrack.git
```

2. Change directory into the project. When downloading NodeJs you will have also downloaded the npm installer, 
which you will use to install the dependencies.
```
npm install
```

3. Now we will install the Python libraries: bs4, requests. First, we need to set up a virtual environment. So inside the project run
```
python3 -m venv virtual
```

4. Next activate the virtual environment and use the `pip` to install the libraries in `requirements.txt`.
```
# cd into the bin
cd virtual/bin

# activate the venv
source activate

# install the requirements using pip 
pip install -r ../../requirements.txt

# deactivate the venv
deactivate
```

5. Run the server and go to localhost:5000.

```
# cd into the src folder 
cd ../../src

# run the server
node server.js
```

