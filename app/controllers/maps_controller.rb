class MapsController < ApplicationController
  
    def index
      @maps = Map.all
    end

    def show
    end

    def edit
    end



    private
      
      def set_map
        @map = Map.find(params[:id])
      end

      def map_params
        params.require(:map).permit(:name, :path)
      end
  
  end