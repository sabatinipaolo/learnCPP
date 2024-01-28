#include <stdio.h>

int main()
{
    int a = 3 ;
    int b = 5 ;
    int c = 6 ;
        
    printf("%d %d %d\n\n", a , b , c);
    
    {   
        int a=1;
        int b=1 ;
        printf("%d %d %d\n\n", a , b , c);

        { 
            int a=0 ;
            printf("%d %d %d\n\n", a , b , c);
        }     
        
        printf("%d %d %d\n\n", a , b , c);
    }

    printf("%d %d %d\n\n", a , b , c);
    
}

