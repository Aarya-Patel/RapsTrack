from bs4 import BeautifulSoup, SoupStrainer
import requests, json, xml


def scrape() -> None:
    """This method scrape the Raptor's Schedule from thier official website
    and stores the data within a .json file
    """
    # The URL that will be scraping - will be scraping the Raptor's Schedule
    url = 'https://www.nba.com/raptors/schedule'
    url2 = 'https://www.espn.com/nba/team/schedule/_/name/tor'

    # Get the html
    response = requests.get(url, timeout=5)
    response2 = requests.get(url2, timeout=5)

    # Parse the <response> into BeautifulSoup that we will be using to scrape

    content = BeautifulSoup(response.content, 'html.parser',
                            parse_only=SoupStrainer(
                                class_=' schedule schedule--Regular Season'))
    content2 = BeautifulSoup(response2.content, 'html.parser',
                             parse_only=SoupStrainer(class_='Table__TBODY'))

    # Get all the div tags that make up each section of the schedule
    # Get the regular season tag
    regular_season = content.find(
        'section', class_='schedule schedule--Regular Season')

    # Scraping all possible <li> tags that are game blocks
    all_game_blocks = regular_season.find_all_next(
        'li', attrs={'id': True, 'class': True, 'data-eventtime': True,
                     'data-gamestatus': True, 'data-arena': True,
                     'itemtype': True})

    all_games_sections = \
        content2.find_all('tr',
                          attrs={'class': True, 'data-idx': True})

    # # Get all the opponent teams
    team_names = []
    for game in all_games_sections:
        if game['data-idx'] == '0' or game['data-idx'] == '56':
            pass
        else:
            temp = game.find_next('a', attrs={'class': 'AnchorLink',
                                              'tabindex': True})
            team_span = temp.find_next('a', attrs={'class': 'AnchorLink',
                                                   'tabindex': True})
            team_names.append(team_span.text[0:len(team_span.text)-1])
            # print(team_span.text[0:len(team_span.text)-1])


    # Game Data, this will contain json objects that we will dump into a file
    game_data = []
    counter = 0
    # Iterate through each game and pull out specific data and dump it into a
    # json file
    for game in all_game_blocks:
        # --------------------- Logistics ---------------------

        # Check if this game was played away or at home
        home_away_game = game.find_next(class_=True).text.split('\n')[1]
        # print(game.find_next(class_=True).text)

        # Get the day of the week this game was played
        day = game.find_next('span', class_='mobile').text

        date_tag = game.find_next(
            'span', class_='date etowah-schedule__event_datetime__'
                           'date etowah-schedule__event--game__'
                           'datetime__date').text.split(' ')
        # print(date_tag)
        # The month is the 3rd element and the date is the 4th element
        month = date_tag[2]
        date = date_tag[3]
        # print(day, month, date)

        # --------------------- Game Statistics ---------------------

        # Game status update
        game_status_tag = game.find_next(
            'span', class_='event_time game-status__past')
        # Otherwise the game is not played
        if game_status_tag is None:
            game_status_tag = game.find_next(
                'span', class_='event_time game-status__future')

            # These games have not been played yet
            game_status = None
            time_zone = game_status_tag.find_next('small').text
            time = game_status_tag.text.split(' ')[0].replace(time_zone, '')
            quarter = None
            score = None

            # print(time, time_zone)
        else:
            # Theses games are played
            game_status = game_status_tag.text.split(' ')[0]
            time_zone = None
            time = None
            quarter = game_status_tag.find_next('small').text
            score = game_status_tag.text.split(' ')[1].replace(quarter, '')

            # print(game_status, score, quarter)

        # --------------------- Leaderboard Statistics ---------------------

        leaderboard_tag = game.find_next(
            'div', class_='etowah-schedule__event__game-context leaderboard')
        # Otherwise the game has yet to be played and hence there is no leaderboard
        if leaderboard_tag is None:
            points_leader = None
            points = None
            rebounds_leader = None
            rebounds = None
            assists_leader = None
            assists = None
        else:
            # Get the respective stat tags
            point_tag = leaderboard_tag.find_next(
                'div', class_='schedule_leaderboard points')
            rebound_tag = leaderboard_tag.find_next(
                'div', class_='schedule_leaderboard rebounds')
            assist_tag = leaderboard_tag.find_next(
                'div', class_='schedule_leaderboard assists')

            # Get the POINT leader and the number of points made
            points_leader = point_tag.find_next('div', class_='pname').text
            points = int(point_tag.find_next(
                'div', class_='pstats').text.replace('PTS', ''))

            # Get the REBOUND leader and the number of rebounds made
            rebounds_leader = rebound_tag.find_next('div', class_='pname').text
            rebounds = int(rebound_tag.find_next(
                'div', class_='pstats').text.replace('RBS', ''))

            # Get the ASSIST leader and the number of assists made
            assists_leader = assist_tag.find_next('div', class_='pname').text
            assists = int(assist_tag.find_next(
                'div', class_='pstats').text.replace('ASTS', ''))

        # This is the dictionary that will contain all this information and
        # will be appended to game_data to be dumped into .json file
        info_object = {
            'opponent': team_names[counter],
            'location': home_away_game,
            'day': day + ' ' + month + ' ' + date,
            'game_status': game_status,
            'time_zone': time_zone,
            'time': time,
            'quarter': quarter,
            'score': score,
            'points_leader': points_leader,
            'points': points,
            'rebounds_leader': rebounds_leader,
            'rebounds': rebounds,
            'assists_leader': assists_leader,
            'assists': assists
        }
        # Append this obj into the array
        game_data.append(info_object)
        counter += 1

    # Now we will dump the game_data array into the .json file
    with open('data.json', 'w') as file:
        json.dump(game_data, file, ensure_ascii=False, indent=4)
