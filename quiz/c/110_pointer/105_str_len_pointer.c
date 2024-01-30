#include <stdio.h>

int main()
{
    char str []= "abcdef";
    
    char* ps = str;
    
    while ( *ps++  )
        ;
    printf ("%ld\n"  , ps - str -1  ) ; // %ld ??


}
