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

	var p = new panel(16 , panel_array.length)

	new_panel.appendChild(p.frame_label)

	var add_frame_button = document.createElement('button')
	add_frame_button.innerHTML = "Add Frame"
	add_frame_button.setAttribute('class' , "frame_button")
	add_frame_button.setAttribute('onclick' , "add_frame_click(this)")
	new_panel.appendChild(add_frame_button)

	var remove_frame_button = document.createElement('button')
	remove_frame_button.innerHTML = "Remove Frame"
	remove_frame_button.setAttribute('class' , "frame_button")
	remove_frame_button.setAttribute('onclick' , "remove_frame_click(this)")
	new_panel.appendChild(remove_frame_button)

	var duration_label = document.createElement('label')
	duration_label.innerHTML = "Duration"
	new_panel.appendChild(duration_label)

	new_panel.appendChild(p.duration_input)

	new_panel.appendChild(document.createElement('br'))

	var prev_button = document.createElement('button')
	prev_button.innerHTML = "<<"
	prev_button.setAttribute('class' , "canvas_button")
	prev_button.setAttribute('onclick' , "prev_frame_click(this)")

	new_panel.appendChild(prev_button)


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
	button.innerHTML = "Stop"

	stopped = 0
	play()
}

function play()
{
	for(var i = 0; i < panel_array.length; i ++)
	{
		panel_array[i].play_frame()
	}
}

function stop(button)
{
	stopped = 1

	button.setAttribute('onclick' , "play_click(this)")
	button.innerHTML = "Play"
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

function duration_input_change(input)
{
	var id = input.parentNode.id
	var panel_index = parseInt(id)

	panel_array[panel_index].duration_change()

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

function change_duration_input(value)
{
	this.duration_input.setAttribute('value' , value)
	this.duration_input.value = value
}

function change_frame_label(index)
{
	this.frame_label.innerHTML = "Frame " + (index + 1)
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

function initialize_input()
{
	var new_duration_input = document.createElement('input')
	new_duration_input.setAttribute('type' , "text")
	new_duration_input.setAttribute('onchange' , "duration_input_change(this)")
	new_duration_input.setAttribute('value' , "1")

	this.duration_input = new_duration_input
}

function initialize_frame_label()
{
	var new_frame_label = document.createElement('label')
	new_frame_label.innerHTML = "Frame 1"
	this.frame_label = new_frame_label
}

function play_frame()
{
	if(!stopped)
	{
		var self = this
		setTimeout(function()
		{
			self.next_frame()
			self.play_frame()
		} , this.duration_array[this.current_index] * 1000)
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
	this.duration_array.splice(this.current_index + 1 , 0 , 1)
}


function remove_frame()
{
	if(frame_array.length > 1)
	{
		this.frame_array.splice(this.current_index , 1)
		this.duration_array.splice(this.current_index , 1)
		this.current_index -= 1
		this.next_frame()
	}
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

	this.change_duration_input(this.duration_array[this.current_index])
	this.change_frame_label(this.current_index)	
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

	this.change_duration_input(this.duration_array[this.current_index])
	this.change_frame_label(this.current_index)
	
}

function duration_change()
{
	this.duration_array[this.current_index] = parseInt(this.duration_input.value)
}


function panel(num_pixels , panel_id)
{
	this.current_index = 0
	this.num_pixels = num_pixels
	this.panel_id = panel_id
	
	this.duration_array = new Array()
	this.canvas_array = new Array()

	//Frame Array is an array of array of colors that represent the colors of the frames
	this.frame_array = new Array()

	this.play_frame = play_frame
	this.initialize_canvas = initialize_canvas
	this.next_frame = next_frame
	this.prev_frame = prev_frame
	this.remove_frame = remove_frame
	this.add_frame = add_frame
	this.change_canvas_color = change_canvas_color
	this.increment_color = increment_color
	this.duration_change = duration_change
	this.initialize_input = initialize_input
	this.change_duration_input = change_duration_input
	this.change_frame_label = change_frame_label
	this.initialize_frame_label = initialize_frame_label

	this.initialize_frame_label()
	this.initialize_input()
	this.initialize_canvas()
	this.add_frame()
}
