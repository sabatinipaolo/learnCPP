#include <stdio.h>

int main()
{
    char str1[] ="pari";
    char str2[] ="dispari";
    char * ps ;

    int n = 7 ; 
    
    if ((n%2) == 0) 
        ps = str1;
    else
        ps = str2;
        
    printf("%s" , ps );

}
