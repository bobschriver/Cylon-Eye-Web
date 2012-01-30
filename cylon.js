//General global functions

//TODO setup array of panel objects

function remove_panel(button)
{
}

//Functions that need to be mapped to panel objects
function canvas_click(canvas)
{
}

function next_frame_click(button)
{
}

function remove_frame_click(button)
{
}


//Panel Object Functions
function change_canvas_color(canvas_index)
{
	var current_color = this.frame_array[this.current_index][canvas_index]

	//Set new color to current_color + step size
	var new_color;

	this.canvas_array[canvas_index].setColor(new_color)
	this.frame_array[this.current_index][canvas_index] = new_color
}

function initialize_canvas()
{
	for(i = 0; i < num_pixels; i ++)
	{
		var new_canvas = document.createElement('canvas')
		var new_canvas_id = this.panel_id + '_' + i
		newelement.setAttribute('id' , newelement_id)
		newelement.setAttribute('onClick' , 'canvas_click(this)')

		this.canvas_array.push(new_canvas)
	}
}

function remove_frame()
{
	this.frame_array.splice(this.current_index , 1)
	this.current_index -= 1
	this.next_panel()
}

function next_frame()
{
	this.current_index += 1
	for(i = 0; i < this.frame_array[this.current_index]; i++)
	{
		this.canvas_array[i].setColor(this.frame_array[this.current_index][i])
	}
}

function panel(num_pixels , panel_id)
{
	this.current_index = 0
	this.num_pixels = num_pixels
	this.panel_id = panel_id

	this.canvas_array = new Array()

	//Frame Array is an array of array of colors that represent the colors of the frames
	this.frame_array = new Array()

	this.initialize_canvas = initialize_canvas
	this.next_frame = next_frame
	this.remove_frame = remove_frame
}
