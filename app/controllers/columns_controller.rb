class ColumnsController < ApplicationController
  def index
    @columns = Column.all.order(:position)
  end

  def create
    @column = Column.create(column_params)
    render json: @column
  end

  def create_task
    @column = Column.find(params[:column_id])
    @task = @column.tasks.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    @column = Column.find(params[:id])
    @column.update(column_params)
    head :ok
  end

  private

  def column_params
    params.require(:column).permit(:name, :position)
  end

  def task_params
    params.require(:task).permit(:name, :position)
  end
end