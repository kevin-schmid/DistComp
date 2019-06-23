# {"players":[{"username":"bulma","correctAnswers":4},{"username":"vegeta","correctAnswers":2},{"username":"goku","correctAnswers":2},{"username":"master roshi","correctAnswers":0}]}

class QueueParser:
    def parse(self):
        print("XXXXXXXXXXXXXXXXXX Start Parsing XXXXXXXXXXXXXXXXXX")
        data = '{"players":[{\"user\":\"kevin\",\"games_won\":\"1\",\"games_lost\":\"400\",\"ranking\":\"5\"},{\"user\":\"kevin1\",\"games_won\":\"2\",\"games_lost\":\"300\",\"ranking\":\"4\"},{\"user\":\"kevin2\",\"games_won\":\"3\",\"games_lost\":\"200\",\"ranking\":\"3\"},{\"user\":\"kevin3\",\"games_won\":\"4\",\"games_lost\":\"100\",\"ranking\":\"2\"},{\"user\":\"kevin4\",\"games_won\":\"5\",\"games_lost\":\"10\",\"ranking\":\"1\"}}'
        data[0:2]
        # print(data)

        db_name = data[2:9]
        print("db_name ")
        print(db_name)
        list_data = data[12:data.__len__() - 1]
        # print(list_data)
        list = list_data.split("},")
        list_new = list
        counter = 0
        for ele in list:
            if (counter < list.__len__() - 1):
                list_new[counter] = ele + '}'
            counter = counter + 1

        print("Liste ")
        for ele in list_new:
            print(ele)

        return list_new
