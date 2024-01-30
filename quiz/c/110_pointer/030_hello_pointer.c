#include <stdio.h>

int main()
{
    int  n = 3;
    
    int* p = &n;
    
    printf("%d\n" ,  n   );
    printf("%d\n" ,  *p );
    printf("\n");
    
    n = 8 ;
    
    printf("%d\n" ,  n   );
    printf("%d\n" ,  *p );
    printf("\n");
    
    *p= 6;
    
    printf("%d\n" ,  n   );
    printf("%d\n" ,  *p );
    printf("\n");
    
    

}
