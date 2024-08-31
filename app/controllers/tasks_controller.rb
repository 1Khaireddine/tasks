class TasksController < ApplicationController
  def create
    @column = Column.find(params[:column_id])
    @task = @column.tasks.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    head :ok
  end

  private

  def task_params
    params.require(:task).permit(:name, :position, :column_id)
  end
end