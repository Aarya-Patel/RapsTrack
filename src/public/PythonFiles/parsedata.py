import csv, json


def parse(file: 'File') -> None:
    """Parse the json file and create a csv file"""
    with open('data.json', 'r') as json_file:
        data = json.load(json_file)

    # with open(file, 'w', newline='') as csvfile:
    csvwriter = csv.writer(file)
    csvwriter.writerow(data[0].keys())
    for i in range(len(data)):
        csvwriter.writerow(data[i].values())
