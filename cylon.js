//General global functions

//TODO setup array of panel objects

panel_array = new Array();


function add_panel(panel_parent)
{
	var panel_id = panel_array.length

	var new_panel = document.createElement('div')
	new_panel.setAttribute('class' , "panel_div")
	panel_parent.appendChild(new_panel)
	var new_panel_id = panel_id
	
	new_panel.setAttribute('id' , new_panel_id)

	var add_frame_button = document.createElement('button')
	add_frame_button.innerHTML = "Add Frame"
	add_frame_button.setAttribute('class' , "add_frame_button")
	add_frame_button.setAttribute('onclick' , "add_frame_click(this)")
	new_panel.appendChild(add_frame_button)

	var remove_frame_button = document.createElement('button')
	remove_frame_button.innerHTML = "Remove Frame"
	remove_frame_button.setAttribute('class' , "remove_frame_button")
	remove_frame_button.setAttribute('onclick' , "remove_frame_click(this)")
	new_panel.appendChild(remove_frame_button)
	

	new_panel.appendChild(document.createElement('br'))


	var prev_button = document.createElement('button')
	prev_button.innerHTML = "<<"
	prev_button.setAttribute('class' , "canvas_button")
	prev_button.setAttribute('onclick' , "prev_frame_click(this)")

	new_panel.appendChild(prev_button)

	var p = new panel(16 , panel_array.length)

	for(i = 0; i < p.canvas_array.length; i++)
	{
		new_panel.appendChild(p.canvas_array[i])
		var canvas_context = p.canvas_array[i].getContext('2d')
		
		canvas_context.fillStyle = '#000000'

		canvas_context.fillRect(0, 0, 20, 50)
	}

	var next_button = document.createElement('button')
	next_button.innerHTML = ">>"
	next_button.setAttribute('class' , "canvas_button")
	next_button.setAttribute('onclick' , "next_frame_click(this)")

	new_panel.appendChild(next_button)


	panel_array.push(p)
	
	
}

var stopped = 0
var play_count = 0

function play_click(button)
{
	button.setAttribute('onclick' , "stop(this)")
	button.innerHTML = "stop"

	stopped = 0
	play()
}

function play()
{
	if(stopped == 0)
	{
		for(var i = 0; i < panel_array.length; i ++)
		{
			panel_array[i].next_frame()
		}

		setTimeout("play()" , 1000)
	}
}

function stop(button)
{
	stopped = 1

	button.setAttribute('onclick' , "play_click(this)")
	button.innerHTML = "play"
}

function remove_panel(button)
{
}

//Functions that need to be mapped to panel objects
function canvas_click(canvas)
{
	var id = canvas.id
	var split = id.split("_")
	var panel_index = parseInt(split[0])
	var canvas_index = parseInt(split[1])

	panel_array[panel_index].increment_color(canvas_index)
}

function prev_frame_click(button)
{
	var id = button.parentNode.id
	var panel_index = parseInt(id)

	panel_array[panel_index].prev_frame()
}

function next_frame_click(button)
{

	var id = button.parentNode.id
	var panel_index = parseInt(id)
	panel_array[panel_index].next_frame()
}

function add_frame_click(button)
{
	var id = button.parentNode.id
	var panel_index = parseInt(id)

	panel_array[panel_index].add_frame()
}

function remove_frame_click(button)
{
	var id = button.parentNode.id
	var panel_index = parseInt(id)
	
	panel_array[panel_index].remove_frame()
}


//Panel Object Functions
function change_canvas_color(canvas_index , new_color)
{
	var canvas_context = this.canvas_array[canvas_index].getContext('2d')
	canvas_context.fillStyle = new_color
	canvas_context.fillRect(0, 0, 20, 50);
	
	this.frame_array[this.current_index][canvas_index] = new_color
}

function increment_color(canvas_index)
{

	var current_color = this.frame_array[this.current_index][canvas_index]
	var next_color = increment_red(current_color)
	this.change_canvas_color(canvas_index , next_color)
}

function initialize_canvas()
{
	for(var i = 0; i < this.num_pixels; i ++)
	{
		var new_canvas = document.createElement('canvas')
		var new_canvas_id = this.panel_id + '_' + i
		new_canvas.setAttribute('id' , new_canvas_id)
		new_canvas.setAttribute('onClick' , 'canvas_click(this)')
		new_canvas.setAttribute('width' , '20')
		new_canvas.setAttribute('height' , '50')

		this.canvas_array.push(new_canvas)
	}
}

function add_frame()
{
	var new_frame = new Array()

	for(var i = 0; i < this.num_pixels; i++)
	{
		new_frame.push('#000000')
	}
	//this.frame_array.push(new_frame)
	this.frame_array.splice(this.current_index + 1, 0 , new_frame)
}

function remove_frame()
{
	this.frame_array.splice(this.current_index , 1)
	this.current_index -= 1
	this.next_frame()
}

function next_frame()
{
	
	
	this.current_index += 1
	if(this.current_index >= this.frame_array.length)
	{
		this.current_index = 0
	}

	for(var i = 0; i < this.frame_array[this.current_index].length; i++)
	{
		this.change_canvas_color(i , this.frame_array[this.current_index][i])
	}
	
}

function prev_frame()
{
	
	this.current_index -= 1
	if(this.current_index < 0)
	{
		this.current_index = this.frame_array.length - 1
	}

	for(i = 0; i < this.frame_array[this.current_index].length; i ++)
	{
		this.change_canvas_color(i , this.frame_array[this.current_index][i])
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
	this.prev_frame = prev_frame
	this.remove_frame = remove_frame
	this.add_frame = add_frame
	this.change_canvas_color = change_canvas_color
	this.increment_color = increment_color

	this.initialize_canvas()
	this.add_frame()
}
