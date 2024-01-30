#include <stdio.h>

int main()
{
    char str []= "abcdef";
    
    char* ps = str;
    
    printf ("%c %c\n" , *ps , str[0] ) ;
   
    ps = ps + 6;
    printf ("%d %d\n" , *ps , str[6]) ;


    printf ("%ld\n"  , ps - str  ) ; // %ld ??


}
