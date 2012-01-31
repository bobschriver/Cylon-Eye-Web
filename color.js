function hex_to_rgb(hexString)
{
	r = parseInt(hexString.substring(1 , 3) , 16)
	g = parseInt(hexString.substring(3 , 5) , 16)
	b = parseInt(hexString.substring(5 , 7) , 16)

	return [r , g , b]
}

function pad_zeros(c , length)
{
	while(c.length < length)
	{
		c = '0' + c
	}

	return c
}

function rgb_to_hex(r , g , b)
{
	if(r > 255)
		r = 255

	rString = r.toString(16)
	rString = pad_zeros(rString , 2)

	if(g > 255)
		g = 255
	//haha
	gString = g.toString(16)
	gString = pad_zeros(gString , 2)

	if(b > 255)
		b = 255

	bString = b.toString(16)
	bString = pad_zeros(bString , 2)

	return '#' + rString + gString + bString
}

function increment_red(color)
{
	var hex = hex_to_rgb(color)

	if(hex[0] >= 255)
	{
		hex[0] = 0
	}
	else
	{
		hex[0] += (256 / 8)
	}

	return rgb_to_hex(hex[0] , hex[1] , hex[2])
}

