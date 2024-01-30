#include <stdio.h>

int main()
{
    char str []= "abcdef";
    
    char* ps = str;
    
    while ( *ps != 0  )
        ps++ ;
    printf ("%ld\n"  , ps - str  ) ; // %ld ??


}
