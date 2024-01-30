#include <stdio.h>

int main()
{
    char c = 'A';
    
    char* pc;
    
    pc = &c;
    
    printf("%c\n" ,  c   );
    printf("%c\n" ,  *pc );
    printf("\n");
    
    c='F';
    
    printf("%c\n" ,  c   );
    printf("%c\n" ,  *pc );
    printf("\n");
    
    *pc='Z';
    
    printf("%c\n" ,  c   );
    printf("%c\n" ,  *pc );
    printf("\n");
    
    

}
