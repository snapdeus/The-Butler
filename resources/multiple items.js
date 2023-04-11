// const canvas = createCanvas(100, 100);
// const ctx = canvas.getContext('2d');


// const image1 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\100.png'
// const image2 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\099.png'
// const image3 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\098.png'
// const image4 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\097.png'
// const image5 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\096.png'
// const image6 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\095.png'
// const image7 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\094.png'
// const image8 = 'C:\\Users\\Stephen\\Documents\\codingProjects\\The-Butler\\resources\\rpgItems\\mini\\093.png'


// async function loadImageAndDraw(x, y, imagePath) {
//     const image = await loadImage(imagePath);
//     ctx.drawImage(image, x, y, 25, 25);
// }
// async function drawImages() {
//     const imagePaths = [image1, image2, image3, image4, image5, image6, image7, image8];
//     const positions = [{ x: 0, y: 0 }, { x: 25, y: 0 }, { x: 50, y: 0 }, { x: 75, y: 0 }, { x: 0, y: 25 }, { x: 25, y: 25 }, { x: 50, y: 25 }, { x: 75, y: 25 }];
//     await Promise.all(imagePaths.map((imagePath, index) => loadImageAndDraw(positions[index].x, positions[index].y, imagePath)));
// }

// await drawImages();

// function getQuadrantBuffer(originalCanvas, x, y, width, height) {
//     const quadrantCanvas = createCanvas(width, height);
//     const quadrantCtx = quadrantCanvas.getContext('2d');
//     quadrantCtx.drawImage(originalCanvas, x, y, width, height, 0, 0, width, height);
//     return quadrantCanvas.toBuffer('image/png');
// }

// function getAllQuadrantBuffers() {
//     const quadrant1 = getQuadrantBuffer(canvas, 0, 0, 25, 25);
//     const quadrant2 = getQuadrantBuffer(canvas, 25, 0, 25, 25);
//     const quadrant3 = getQuadrantBuffer(canvas, 50, 0, 25, 25);
//     const quadrant4 = getQuadrantBuffer(canvas, 75, 0, 25, 25);
//     const quadrant5 = getQuadrantBuffer(canvas, 0, 25, 25, 25);
//     const quadrant6 = getQuadrantBuffer(canvas, 25, 25, 25, 25);
//     const quadrant7 = getQuadrantBuffer(canvas, 50, 25, 25, 25);
//     const quadrant8 = getQuadrantBuffer(canvas, 75, 25, 25, 25);
//     return [quadrant1, quadrant2, quadrant3, quadrant4, quadrant5, quadrant6, quadrant7, quadrant8];
// }

// const allBuffers = getAllQuadrantBuffers();

// const attachment = new Discord.MessageAttachment(allBuffers[0], 'img.png');
// const attachment2 = new Discord.MessageAttachment(allBuffers[1], 'img2.png');
// const attachment3 = new Discord.MessageAttachment(allBuffers[2], 'img3.png');
// const attachment4 = new Discord.MessageAttachment(allBuffers[3], 'img4.png');
// const attachment5 = new Discord.MessageAttachment(allBuffers[4], 'img5.png');
// const attachment6 = new Discord.MessageAttachment(allBuffers[5], 'img6.png');
// const attachment7 = new Discord.MessageAttachment(allBuffers[6], 'img7.png');
// const attachment8 = new Discord.MessageAttachment(allBuffers[7], 'img8.png');

// const embeds = [
//     new Discord.MessageEmbed().setThumbnail('attachment://img.png').setTitle('Shell').setDescription('Useful item!').setFooter({ text: 'XP boost' }),
//     new Discord.MessageEmbed().setThumbnail('attachment://img2.png').setTitle('Shell').setDescription('Useful item!').setFooter({ text: 'XP boost' }),
//     new Discord.MessageEmbed().setThumbnail('attachment://img3.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
//     new Discord.MessageEmbed().setThumbnail('attachment://img4.png').setTitle('Feather').setDescription('Useful item!').setFooter({ text: 'AP boost' }),
//     new Discord.MessageEmbed().setThumbnail('attachment://img5.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
//     new Discord.MessageEmbed().setThumbnail('attachment://img6.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
//     new Discord.MessageEmbed().setThumbnail('attachment://img7.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),
//     new Discord.MessageEmbed().setThumbnail('attachment://img8.png').setTitle('Wings').setDescription('Useful item!').setFooter({ text: 'HP boost' }),

// ];
// await interaction.reply({ embeds, files: [attachment, attachment2, attachment3, attachment4, attachment5, attachment6, attachment7, attachment8] });


//HERE IS SHORTENED FORM

async function loadImageAndDraw(x, y, imagePath) {
    const image = await loadImage(imagePath);
    ctx.drawImage(image, x, y, 50, 50);
}
async function drawImages() {
    const imagePaths = [image1];
    const positions = [{ x: 0, y: 0 }];
    await Promise.all(imagePaths.map((imagePath, index) => loadImageAndDraw(positions[index].x, positions[index].y, imagePath)));
}

await drawImages();

function getQuadrantBuffer(originalCanvas, x, y, width, height) {
    const quadrantCanvas = createCanvas(width, height);
    const quadrantCtx = quadrantCanvas.getContext('2d');
    quadrantCtx.drawImage(originalCanvas, x, y, width, height, 0, 0, width, height);
    return quadrantCanvas.toBuffer('image/png');
}

function getAllQuadrantBuffers() {
    const quadrant1 = getQuadrantBuffer(canvas, 0, 0, 50, 50);

    return [quadrant1];
}

const allBuffers = getAllQuadrantBuffers();

const attachment = new Discord.MessageAttachment(allBuffers[0], 'img.png');