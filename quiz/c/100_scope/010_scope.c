#include <stdio.h>

int main()
{
    int a = 3 ;
    int b = 5 ;
        
    printf("%d %d \n\n", a , b );
    
    {
        int a = 1;
        printf("%d %d \n\n", a , b );
    }

    printf("%d %d \n\n", a , b );

}

