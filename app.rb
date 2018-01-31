require 'bundler/setup'
Bundler.require
require 'sinatra/reloader' if development?
require 'sinatra-websocket'

set :server, 'thin'
set :sockets, []

get '/:id' do
  erb :index
end

get '/:id/websocket' do
  if request.websocket?
    id = params[:id].to_i
    settings.sockets[id]  = []
    
    request.websocket do |ws|
      ws.onopen do
        settings.sockets[id]  << ws
      end
      
      ws.onmessage do |msg|
        binding.pry
        settings.sockets[id].each do |s|
          s.send(msg)
        end
      end
      
      ws.onclose do
        settings.sockets.insert(id,)
      end
    end
  end
end