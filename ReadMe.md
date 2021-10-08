This project is about simulating natural selection 

to run the code, load the code in a same directory and run the main html file
to modify the parameter, change the variables at beginning of the FinGeneAlgo.js file

All the processes have been outlined in the documentation 
genes = Their 2D vectors
individuals = balls

Overview: We judge the capability of a species by their ability to reach a target. 
Generation 0 is spawned with random genes. Then, they are judged by theiir ability to get closer to the target
higher fitness = closer to the target. individuals with high fitness are more likely to be chosen for mating.
after generation 0 exhausts their genes, we mate them and spawn a new generation.

In theory, this should increase each generation's ability to reach their target. 
with each generation, the fitness score increses, thereby confirming darwin's theory of survival of the fittest

Here is a representation of how the simulation works:

![alt text] [simulation]
[simulation] : https://github.com/harmya/NaturalSelection/blob/main/SimulationNS.gif
