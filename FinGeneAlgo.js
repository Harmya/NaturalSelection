num_genes = 100;
velocity = 20;
numberIndividuals = 100;
individuals = [];
generation_fitness = 0;
generation_final = 0;
generation = 0;
// IN THIS PROJECT, A BALL = Individual
//                  A GENE = A set of x,y vectors 
//                  A gene array = set of x,y vectors which dictate the random path for the individual
//                  indivdual array = stores all the properties of individual balls

class Individual  //creates a class for abstracting each individual
{
    constructor(x,y,c)   //constructor for each individual
    {
        this.x = x;
        this.y = y;
        this.c = c;
        this.radius = 10;
        this.index = 0;
        this.fitness = 0;
        this.reached = false;

    }
    MakeTarget()          //creates the rectangular target
    {
     this.c.beginPath();
     this.c.rect(380, 760, 40, 40 );
     this.c.fillStyle = "White";
     this.c.fill();
    }

    createIndividual()      //spawns a new individual, also changes its colour to black when reached
    { 
        this.c.fillStyle = "Orange";
        if(this.reached)
        {   
          this.c.fillStyle = "Black";
        }
            this.c.beginPath()
            this.c.arc(this.x,this.y,this.radius, 0 , Math.PI * 2 , false);
            this.c.fill();
    }
    moveIndividual()    //for moving the individual
    {
        if (380 < this.x && 420 > this.x && 760 < this.y && 800 > this.y)  //judges if the individual has reached
        {
            this.reached = true;
            this.index++;
        }
        else if (this.index < num_genes)   // moves the individual in the direction of randomly generated x,y vectors(genes)
        {
        this.x += velocity * this.genes[this.index][0];
        this.y += velocity * this.genes[this.index][1];
        this.index++;
        }
    }
    
    setGenes(genes)  //sets the genes for a new individual
    {
            this.genes = genes;
    }
    
    setRandom_genes()   //sets the random x,y vector for our generation 0
    {
        this.genes = [];
        for(let i = 0; i < num_genes; i++)
        {
            this.genes[i] = [Math.cos((Math.random()) * 2 * (Math.PI)), Math.sin((Math.random()) * 2 * (Math.PI))];
            // generates a random angle between 0 and 2pi, then uses cos component = x direction and
            // sin component = y direction
        }
    }

    calcFitness()
    {
        var d = Math.sqrt((this.x - 400) ** 2 + (this.y - 770) ** 2); // a function fitness that judges 
                                                                    //how close the individual is to the target
        this.fitness = Math.max(0, 1 - d/800); 
        // more fitness = less distance between the individual and the target
        // less fitness = more distance between the individual and the target
        // higher fitness = increased chances for selection while mating
    }
    
}
function simulator()  // a driver function for the simulator
{
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    for(let i = 0; i < numberIndividuals ; i++)
    {  
        var In = new Individual(395,50,c);
        In.setRandom_genes();              // sets random genes for each individual 
        individuals.push(In);
    }
    animate();                            // calls animate function
}
function animate()
{
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < numberIndividuals ; i++)
    {
        var In = individuals[i];
        In.moveIndividual();          // moves each individual according to its set genes
        In.createIndividual();
        In.MakeTarget(); 

    }
    c.font = "20px Arial";
    c.fillText("Generation: " + generation.toString(), 15, 45);
    c.fillText("Generation Fitness: " + generation_final.toFixed(2).toString(), 15, 90);

    if (individuals[0].index == num_genes)
     {
        nextGeneration()          // if the number of genes is exhausted, then mating process occurs
    }
}
function nextGeneration()        // a function to spawn next generation
{   
    generation += 1;
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    var candidates = [];       // creates an array of candidates based on their fitness
    var generation_fitness = 0;
    for(let i = 0; i < numberIndividuals ; i++)
    {
        var In = individuals[i];
        In.calcFitness();
        generation_fitness += In.fitness;
        for(let j = 0; j < (Math.exp(In.fitness*10));j++)
        // fitness value is always between 0 and 1
        // here, we apply an exponential funtion to individuals relative to their fitness values
        // so an individual with high fitness will get added into the array
        // exponentially more times
        // so an individual with fitness = 0.5, will get added e^5 times
        // while an individual with fitness = 0.1 will get added only e^1 times
        // hence, we will have a mating population in which the probability of
        // selecting higher fitness individuals is more likely

        {
            candidates.push(In);
        }
    }
    generation_final = generation_fitness

    var newIndividuals = [];
    for(let i = 0; i < numberIndividuals; i++)
    {
        var dad = candidates[Math.floor(candidates.length * Math.random())];
        var mom = candidates[Math.floor(candidates.length * Math.random())];
        // randomly picks two parents from out mating pool
        var In = new Individual(380,50,c) // baby 
        var genes = [] // array for storing genes of the baby

        for(let j = 0; j < num_genes; j++)
        {
        if (Math.random() < 0.03) {
                genes.push([Math.random()-0.5, Math.random()-0.5]); // random mutation of genes
            }
         else if(j % 2 == 0)
            {
                genes.push(dad.genes[j]); // chooses genes at even values from dad
            }
        else
            {
                genes.push(mom.genes[j]); // chooses genes at odd values from mom
        }
    }
        In.setGenes(genes);
        newIndividuals.push(In); //creates a new array for the new babies born
        

    }
    
    individuals = newIndividuals; // replaces the current generation with the new generation
}

simulator();