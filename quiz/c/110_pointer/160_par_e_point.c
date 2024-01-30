#include <stdio.h>


void raddoppia ( int* n ){
    *n= 2 * *n;
}


int main()
{
    int a=3;
    raddoppia( &a ) ;
    printf("%d" , a );
    
    //raddoppia(3);
    
}
