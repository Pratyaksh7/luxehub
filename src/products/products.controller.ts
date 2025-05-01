import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth.service/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
    constructor(private readonly productsSrevice: ProductsService) {}

    @Get()
    @ResponseMessage('Products Fetched Successfully.')
    listProducts(@Request() req) {
        const user = req.user;              // to access the user from the token
        return this.productsSrevice.listProducts();
    }

    @Get('/categories')
    @ResponseMessage('Categories Fetched Successfully')
    listCategories(@Request() req) {
        const user = req.user;  
        return this.productsSrevice.listCategories(user);
    }
    
    @Post()
    @ResponseMessage('Product Created Successfully')
    createProduct(@Request() req, @Body() body:any){
        const user = req.user;  
        return this.productsSrevice.createProduct(user, body);
    }

    @Post('/search')
    @ResponseMessage('Data Found.')
    searchProduct(@Request() req, @Body() body:any){
        const user = req.user;  
        return this.productsSrevice.searchProduct(user, body);
    }

    /** Dynamic Routes below */
    @Get(':productId')
    @ResponseMessage('Product Fetched Successfully.')
    getAProduct(@Request() req, @Param('productId') productId: string){
        const user = req.user;  
        return this.productsSrevice.getAProduct(user, productId);
    }

    @Put(':productId')
    @ResponseMessage('Product Updated Successfully.')
    updateAProduct(@Request() req, @Param('productId') productId: string, @Body() body:any){
        const user = req.user;  
        return this.productsSrevice.updateAProduct(user, productId,body);
    }

    @Delete(':productId')
    @ResponseMessage('Product Deleted Successfully.')
    deleteAProduct(@Request() req, @Param('productId') productId: string,){
        const user = req.user;  
        return this.productsSrevice.deleteAProduct(user, productId);
    }
}
