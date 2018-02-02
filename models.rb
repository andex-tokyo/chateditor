ActiveRecord::Base.establish_connection('sqlite3:db/development.db')

class Session < ActiveRecord::Base
end