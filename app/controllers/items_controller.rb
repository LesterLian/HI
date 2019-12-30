class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  # GET /items
  # GET /items.json
  def index
    @items = Item.all
  end

  # GET /items/1
  # GET /items/1.json
  def show
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    tmp_params = item_params
    if tmp_params[:tags]
      tmp_params[:tags].map! {|tag| Tag.find(tag)}
    end
    @item = Item.new(tmp_params)
    if params[:item][:image] =~ /data:image\/\w+;base64,.+/
      @item.image.attach(data: params[:item][:image])
    end
    # puts "here"
    # puts tmp_params[:image]
    # puts "here"

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render :show, status: :created, location: @item }
      else
        # TODO error when duplicate
        format.html { render :new }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      tmp_params = item_params
      if tmp_params[:tags]
        tmp_params[:tags].map! {|tag| Tag.find(tag)}
      end
      # TODO update with other information doesn't work
      if params[:item][:image] =~ /data:image\/\w+;base64,.+/
        @item.image.purge
        @item.image.attach(data: params[:item][:image])
      end
      if @item.update(tmp_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
      params.require(:item).permit(:name, :count, :price, :storage_id, :time_in, :time_out,
        :tags => [])
    end
end
